import SimpleRestAPI from './API';
import { GetAddress } from '../Services/Metamask';

export const ConfirmTransaction = async (chestID, receipt, callback, failed) => {
    const api = new SimpleRestAPI();

    await GetAddress().then((wallet) => {
        console.log(wallet);

        const body = {
            "walletAddress": wallet,
            "starterPacksId": chestID,
            "hashTransaction": receipt
        }

        api.DoSendRecipt('/generateBaseStatus', body, (response) => {
            console.log(response);
            if(response.status < 300){
                console.log("SENDING SUCCESS");
                callback(response);
            }else{
                console.log("SENDING FAILED");
                localStorage.setItem("tx", JSON.stringify(body));
                if(response.status === undefined || response.status === 500){
                }else if(response.status === 403){
                    failed(response);
                }
            }
        })
    })  
}

export const GetStarterPacks = (callback) => {
    const api = new SimpleRestAPI();

    api.GetData(`/starterPacks`, (response) => {
        if(response){
            console.log(response);
            callback(response.data);
        }
    })
}

export const GetInventory = (callback) => {
    const api = new SimpleRestAPI();
    api.GetData(`/generateBaseStatus/` + localStorage.getItem("id"), (response) => {
        if(response){
            console.log(response);
            callback(response.data);
        }
    })
}