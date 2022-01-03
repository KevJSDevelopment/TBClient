import React from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const SelectableGalleryItem = ({ nft, index, setImageUrl, selectedIndex, setSelectedIndex, backgroundColor, textColor }) => {

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
        <Grid textAlign='center' item xs={3} className={selectedIndex === index ? 'selected-gallery-item' : 'gallery-item'} key={`${nft}-${index}`}>
            <Card sx={{ width: '90%', height: 325, margin: '5%', backgroundColor: backgroundColor, color: textColor}} onClick={() => setSelectedIndex(index)} >
                <CardActionArea sx={{ width: '100%', height: 350}}>
                    {selectedIndex === index ? 
                        <IconButton color='primary' >
                            <CheckCircleIcon /> 
                        </IconButton>
                        : 
                        <IconButton color='primary' >
                            <CheckCircleOutlineOutlinedIcon /> 
                        </IconButton>
                    }
                    <CardMedia
                    component="img"
                    height="200"
                    image={setImageUrl(nft)}
                    />
                    <CardContent>
                        <Typography color='black' >
                            {nft.meta.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{'hover': {backgroundColor: 'whitesmoke'}}}>
                    <Link underline='hover' href={`https://opensea.io/assets/${collectionId}/${nft.tokenId}`} target='_blank' >
                        View NFT On OpenSea
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SelectableGalleryItem
