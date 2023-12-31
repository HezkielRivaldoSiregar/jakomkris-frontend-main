import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';
export default function BasicTextFields({ title, setPassword, setEmail, handleAction }) {
    return (
        <div>
            <div className="heading-container">
                
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id="email"
                    label="Masukan Email Anda"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    id="password"
                    label="Kata Sandi"
                    variant="outlined"
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>

            <Button title={title} handleAction={handleAction}/>
            
        </div>
    );
}
