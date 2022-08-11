// import fetch from 'node-fetch'
// import fs from 'fs';

// const fetch = require('node-fetch')
const axios = require('axios')
const fs = require('fs')

const nfts = []
const types = new Map()

const addTypes = (data) => {
    data = {
        trait_type: data.trait_type,
        value: data.value,
        trait_count: data.trait_count,
    }
    let type = types.get(data.trait_type)
    if (!type) {
        type = new Map()
    } else if (type.has(data.value)) {
        return
    }
    type.set(data.value, data)
    types.set(data.trait_type, type)
}

async function parseOpenSea(cursor) {
    const url = 'https://api.opensea.io/api/v1/assets?collection=proof-moonbirds&order_direction=desc&limit=200&cursor=' + cursor + '==&include_orders=false';
    const options = {
        headers: {Accept: 'application/json', 'X-API-KEY': '40e4ba51dfb94a9489fdc848b1180d93'}
    };

    return axios.get(url, options)
        .then(res => res.data)
        .then(async json => {
            for (let i = 0; i < json.assets.length; i++) {
                nfts.push({
                    name: json.assets[i].name,
                    image: json.assets[i].image_url,
                    nftId: json.assets[i].name.split('#')[1],
                    tokenId: json.assets[i].token_id,
                    attributes: json.assets[i].traits.map(e => {
                        return {
                            trait_type: e.trait_type,
                            value: e.value
                        }
                    })
                });
                json.assets[i].traits.forEach(addTypes)
            }
            if (json.next) {
                return parseOpenSea(json.next);
            } else {
                console.log('end')
                console.log(nfts.length)
            }
        })
        .catch(err => console.error('parse error:' + err));
}

async function main(callback) {
    const url = 'https://api.opensea.io/api/v1/assets?collection=proof-moonbirds&order_direction=desc&limit=3&include_orders=false';
    const options = {
        headers: {Accept: 'application/json', 'X-API-KEY': '40e4ba51dfb94a9489fdc848b1180d93'}
    };

    return axios.get(url, options)
        .then(res => res.data)
        .then(async (json) => {
            for (let i = 1; i < json.assets.length; i++) {
                nfts.push({
                    name: json.assets[i].name,
                    image: json.assets[i].image_url,
                    nftId: json.assets[i].name.split('#')[1],
                    tokenId: json.assets[i].token_id,
                    attributes: json.assets[i].traits.map(e => {
                        return {
                            trait_type: e.trait_type,
                            value: e.value
                        }
                    })
                });
                json.assets[i].traits.forEach(addTypes)
            }
            await parseOpenSea(json.next);
        })
        .catch(err => console.error('main error:' + err));
}

main().then(() => {
    let fine = []
    for (const [key, value] of types) {
        fine.push({
            trait_type: key,
            types: [...value.values()]
        })
    }
    let data = JSON.stringify(nfts);
    fine = JSON.stringify(fine);
    fs.writeFileSync('moonbirds_nfts.json', data);
    fs.writeFileSync('moonbirds_types.json', fine);
})