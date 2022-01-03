import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const ViewGalleryItem = ({ nft, index, setImageUrl, backgroundColor, textColor}) => {

    const [collectionId, setCollectionId] = useState('')

    const getCollectionId = () => {
        if(!nft.collection) return;

        const collection = nft.collection;

        const collectionArr = collection.split(':');

        setCollectionId(collectionArr[1])
    }

    useEffect(() => {
        getCollectionId()
    }, [nft])

    return (
        <Grid item xs={3} key={`${nft}-${index}`} >
            <Link href={`https://opensea.io/assets/${collectionId}/${nft.tokenId}`} target='_blank' underline='none' >
                <Card sx={{ width: '90%', height: 325, margin: '5%', backgroundColor: backgroundColor, color: textColor}}>
                    <CardActionArea sx={{ width: '100%', height: 350}}>
                        <CardMedia
                        component="img"
                        height="140"
                        image={setImageUrl(nft)}
                        />
                        <CardContent>
                            <Typography>
                                {nft.meta.name}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{'hover': {backgroundColor: 'whitesmoke'}}}>
                            <Link underline='hover'>
                                View On OpenSea
                            </Link>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Link>
        </Grid>
    )
}

export default ViewGalleryItem
