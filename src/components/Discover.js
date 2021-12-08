import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material'
import { ethers } from 'ethers'

const Discover = ({ textcolor, setNFTArray }) => {

    const [errorMessage, setErrorMessage] = useState(null)
    const [defaultAccount, setDefaultAccount] = useState(null)
    const [userBalance, setUserBalance] = useState(null)
    const [connectButtonText, setConnectButtonText] = useState('Connect Wallet')



    const connectWalletHandler = async () => {
        if(window.ethereum){

            const result = await window.ethereum.request({ method: 'eth_requestAccounts'})

            const meta = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': '5cd09ebc-eaea-46e9-974f-1eadbc214fd5'
                }
            }
            const res = await fetch(`https://api.nftport.xyz/v0/accounts/${result[0]}?chain=ethereum&include=metadata`, meta)
            const data = await res.json()

            if(data.response === 'OK'){

                setNFTArray(data.nfts)
            }

            accountChangedHandler(result[0])
            
        } else {
            setErrorMessage('Install MetaMask')
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount(newAccount);
        getUserBalance(newAccount.toString());
    }


    const getUserBalance = async ( accountAddress ) => {
        const balance = await window.ethereum.request({method: 'eth_getBalance', params: [accountAddress, 'latest']})

        setUserBalance(ethers.utils.formatEther(balance));
    }

    const chainChangedHandler = () => {
        window.location.reload()
    }

    window.ethereum.on('accountsChanged', accountChangedHandler)

    window.ethereum.on('chainChanged', chainChangedHandler)

    return (
        <Grid item xs={12} className="discover-content">
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="inherit">
                        Discover
                    </Typography>

                </Grid>
                <Grid item xs={12}>
                    <Typography variant="inherit">
                        Account: {defaultAccount}
                    </Typography>

                </Grid>
                <Grid item xs={12}>
                    <Typography variant="inherit">
                        Balance: {userBalance}
                    </Typography>

                </Grid>
                <Grid  item xs={12}>
                    <Button className="button connect" variant="contained" color="secondary" onClick={connectWalletHandler}>
                        {connectButtonText}
                    </Button>             
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Discover
