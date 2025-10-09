import React, { useContext } from 'react'
import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material'
import { categories } from '../../constants/data'
import {Link, useSearchParams} from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 80%;
    background: #6495ED;
    color: #fff;
`;
const StyledLink = styled(Link)`
    text-decoration:none;
    color: inherit;
`;
const Categories = () => {
    const {account} = useContext(DataContext);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
  return (
    <div>
    {account?.user_type === "Teacher" && (
                <StyledLink to={`/create?category=${category || ''}`}>
                    <StyledButton variant='contained'>Create Blog</StyledButton>
                </StyledLink>
            )}
      <StyledTable>
        <TableHead>
            <TableRow>
                <TableCell>
                <StyledLink to='/'>
                    All Categories
                </StyledLink>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                categories.map(category=>(
                    <TableRow key={category.id}>
                        <TableCell>
                        <StyledLink to={`/?category=${category.name}`}>
                            {category.name}
                            </StyledLink>
                        </TableCell>
                     </TableRow>
                ))
            }
        </TableBody>
      </StyledTable>
    </div>
  )
}

export default Categories
