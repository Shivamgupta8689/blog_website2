import React, { useContext } from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled, Box, useMediaQuery, useTheme, Stack } from '@mui/material'
import { categories } from '../../constants/data'
import {Link, useSearchParams} from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)(({ theme }) => `
    margin: 20px;
    width: 80%;
    background: #6495ED;
    color: #fff;
    
    ${theme.breakpoints.down('sm')} {
        margin: 16px;
        width: 100%;
        font-size: 0.875rem;
    }
`);

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const CategoryContainer = styled(Box)(({ theme }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    
    ${theme.breakpoints.down('sm')} {
        padding: 8px;
        width: 100vw;
        margin-left: calc(-50vw + 50%);
    }
`);

const ResponsiveTableCell = styled(TableCell)(({ theme }) => `
    text-align: center;
    
    ${theme.breakpoints.down('sm')} {
        padding: 12px 8px;
        font-size: 0.875rem;
    }
`);

const Categories = () => {
    const { account } = useContext(DataContext);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <CategoryContainer>
            {account?.user_type === "Teacher" && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <StyledLink to={`/create?category=${category || ''}`}>
                        <StyledButton variant='contained'>
                            {isMobile ? 'Create' : 'Create Blog'}
                        </StyledButton>
                    </StyledLink>
                </Box>
            )}
            
            <Box sx={{ overflowX: 'auto' }}>
                <StyledTable size={isMobile ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'f5f5f5' }}>
                            <ResponsiveTableCell sx={{ fontWeight: 'bold' }}>
                                <StyledLink to='/'>
                                    All Categories
                                </StyledLink>
                            </ResponsiveTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map(cat => (
                            <TableRow key={cat.id} sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(100, 149, 237, 0.05)',
                                },
                                cursor: 'pointer'
                            }}>
                                <ResponsiveTableCell>
                                    <StyledLink to={`/?category=${cat.name}`}>
                                        {cat.name}
                                    </StyledLink>
                                </ResponsiveTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </Box>
        </CategoryContainer>
    )
}

export default Categories
