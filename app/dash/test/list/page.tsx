"use client";

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fab,
    IconButton,
    Chip,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OutlinedInput from '@mui/material/OutlinedInput';
import { uploadData } from '@aws-amplify/storage';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import { TestRepo } from '@/dal/Repositories/TestRepo';
import Test from '@/dal/models/Test';
const TestRepository = new TestRepo();

export default function Page() {
    const [tests, setTests] = useState<Test[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        jsonFile: null as File | null,
        logo: null as File | null,
    });
    const [jsonFileName, setJsonFileName] = useState('');
    const [logoFileName, setLogoFileName] = useState('');

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormData({ name: '', jsonFile: null, logo: null });
        setJsonFileName('');
        setLogoFileName('');
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, name: event.target.value });
    };

    const handleJsonFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFormData({ ...formData, jsonFile: file });
        setJsonFileName(file?.name || '');
    };

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setFormData({ ...formData, logo: file });
        setLogoFileName(file?.name || '');
    };

    const handleAddTest = async () => {
        if (formData.name.trim() && formData.jsonFile && formData.logo) {
            try {
                // Upload JSON file to default storage
                const jsonFileKey = `test/json/${Date.now()}-${formData.jsonFile.name}`;
                await uploadData({
                    path: jsonFileKey,
                    data: formData.jsonFile
                });

                // Upload logo file to default storage
                const logoFileKey = `test/logo/${Date.now()}-${formData.logo.name}`;
                await uploadData({
                    path: logoFileKey,
                    data: formData.logo
                });

                // Create record in database with file paths
                // await client.models.Test.create({
                //     name: formData.name,
                //     json_path: jsonFileKey,
                //     logo_path: logoFileKey
                // });

                await TestRepository.create({
                    name: formData.name,
                    json_path: jsonFileKey,
                    logo_path: logoFileKey
                });

                // Refresh the list
                await fetchTests();
                handleDialogClose();
            } catch (error) {
                console.error('Error uploading files or creating test:', error);
                // You might want to add error handling UI here
            }
        }
    };

    const handleDeleteTest = async (id: string|undefined) => {
        if(!id) return;
        await TestRepository.delete(id);
        setTests(tests.filter(test => test.id !== id));
    };

    const fetchTests = async () => {
        const { data: items } = await TestRepository.list();
        setTests(items);
    };

    useEffect(() => {
        fetchTests();
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Test List
                </Typography>
                <Fab color="primary" aria-label="add" onClick={handleDialogOpen}>
                    <AddIcon />
                </Fab>
            </Box>

            {tests.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    No tests available. Click the + button to add a new test.
                </Typography>
            ) : (
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {tests.map((test) => (
                        <ListItem
                            key={test.id}
                            alignItems="flex-start"
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTest(test.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar alt={test.name || 'Logo'}>
                                    <StorageImage path={test.logo_path} alt={test.name || 'Logo'}></StorageImage>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={test.name}
                                secondary={
                                    <Box sx={{ mt: 1 }}>
                                        <p>
                                            JSON: {test.json_path}
                                        </p>
                                        <p>
                                            Logo: {test.logo_path}
                                        </p>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            {/* Add Test Dialog */}
            <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Test</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <OutlinedInput
                            fullWidth
                            label="Test Name"
                            value={formData.name}
                            onChange={handleNameChange}
                            placeholder="Enter test name"
                            required
                        />

                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{ justifyContent: 'flex-start' }}
                        >
                            Upload JSON File
                            <input
                                type="file"
                                accept=".json"
                                hidden
                                onChange={handleJsonFileChange}
                                required
                            />
                        </Button>
                        {jsonFileName && (
                            <Chip label={`JSON: ${jsonFileName}`} size="small" color="primary" />
                        )}

                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{ justifyContent: 'flex-start' }}
                        >
                            Upload Logo
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleLogoChange}
                                required
                            />
                        </Button>
                        {logoFileName && (
                            <Chip label={`Logo: ${logoFileName}`} size="small" color="secondary" />
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button
                        onClick={handleAddTest}
                        variant="contained"
                        disabled={!formData.name.trim() || !formData.jsonFile || !formData.logo}
                    >
                        Add Test
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
