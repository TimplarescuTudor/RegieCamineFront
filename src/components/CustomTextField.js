import React from 'react';
import { Grid, TextField, Typography } from "@mui/material";


export const CustomTextField = ({ label, id, type, variant, value, onChange }) => {
    return (
        <Grid container item direction="row" justifyContent="space-between" alignItems="center" xs sx={{ paddingY: 2 }}>
            <Grid item>
                <Typography variant="body1" component="label" htmlFor={id}>{label}</Typography>
            </Grid>
            <Grid item>
                <TextField id={id} type={type} variant={variant} value={value} onChange={onChange} sx={{ width: "250px" }} />
            </Grid>
        </Grid>
    );
};

