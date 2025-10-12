import React, { useContext } from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled, Box, useMediaQuery, useTheme } from '@mui/material'
import { categories } from '../../constants/data'
import { Link, useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

const StyledTable = styled(Table)(({ theme }) => `
    border: 1px solid rgba(224, 224, 224, 1);
    
    ${theme.breakpoints.down('sm')} {
        width: 100%;
    }
`);

const StyledButton = styled(Button)(({ theme }) => `
    margin: 20px;
    width: 80%;
    background: #6495ED;
    color: #fff;
    font-weight: 600;
    
    &:hover {
        background: #5a7fd4;
    }
    
    ${theme.breakpoints.between('sm', 'lg')} {
        margin: 18px;
        width: 85%;
        font-size: 0.95rem;
    }
    
    ${theme.breakpoints.down('sm')} {
        margin: 12px;
        width: 90%;
        font-size: 0.875rem;
        padding: 8px 16px;
    }
    
    @media (max-width: 400px) {
        margin: 10px;
        width: 95%;
        font-size: 0.8rem;
        padding: 6px 12px;
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
    justify-content: flex-start;
    padding: 15px 0;
    
    ${theme.breakpoints.up('lg')} {
        padding: 20px 10px;
        min-height: 100vh;
    }
    
    ${theme.breakpoints.between('sm', 'lg')} {
        padding: 15px 8px;
    }
    
    ${theme.breakpoints.down('sm')} {
        padding: 10px 0;
        width: 100%;
    }
    
    @media (max-width: 400px) {
        padding: 8px 0;
    }
`);

const ResponsiveTableCell = styled(TableCell)(({ theme }) => `
    text-align: center;
    padding: 16px;
    
    ${theme.breakpoints.between('sm', 'lg')} {
        padding: 14px 10px;
        font-size: 0.95rem;
    }
    
    ${theme.breakpoints.down('sm')} {
        padding: 12px 8px;
        font-size: 0.875rem;
    }
    
    @media (max-width: 400px) {
        padding: 10px 6px;
        font-size: 0.8rem;
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
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <StyledLink to={`/create?category=${category || ''}`}>
                        <StyledButton variant='contained'>
                            {isMobile ? 'Create' : 'Create Blog'}
                        </StyledButton>
                    </StyledLink>
                </Box>
            )}
            
            <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <StyledTable size={isMobile ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
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
