import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useQuery } from 'graphql-hooks'

import useCreateGroupDialog from '../hooks/useCreateGroupDialog'

import Loading from './Loading'
import Square from './Square'
import { LOAD_GROUPS } from '../graphql'

export default function Groups() {
  const match = useRouteMatch()

  const { data, loading, refetch: loadGroups } = useQuery(LOAD_GROUPS)
  const [dialog, openDialog] = useCreateGroupDialog(loadGroups)

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {dialog}
      <Square mb={2}>
        <Box>
          <Button variant="outlined" color="primary" onClick={openDialog}>
            Create Group
          </Button>
          <IconButton onClick={loadGroups}>
            <span role="img" aria-label="reload groups">
              🔄
            </span>
          </IconButton>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>GroupName</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.groups.map(group => (
              <TableRow key={group.id}>
                <TableCell>
                  <Link to={`${match.url}/${group.id}`}>{group.groupName}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Square>
    </>
  )
}
