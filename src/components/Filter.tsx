import React from 'react'
import { FilterTypes, PageInfoTypes, SortTypes } from '../types/Movie'
import { Box, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";


export default function Filter({
  pageInfo,
  sort,
  onOpenFilter
}: {
  pageInfo: PageInfoTypes,
  sort: SortTypes,
  onOpenFilter: () => void
}) {

  return (
    <Grid container sx={{ mb: 3, alignItems: 'center' }}>
      <Grid size={'grow'}>
        {pageInfo.from} - {pageInfo.to} of {pageInfo.total}
      </Grid>
      <Grid size={'auto'}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            p: 1
          }}
        >
          {/* Filter Button (Chip style like IMDB) */}
          <Chip
            label={<FilterListIcon />}
            // icon=
            onClick={onOpenFilter}
            color="primary"
            variant="filled"
            sx={{
              backgroundColor: "info.main",
              color: "white",
              "& .MuiChip-icon": { color: "white" }
            }}
          />

          Sort by Duration

          {/* Sort Order Toggle */}
          <IconButton
            onClick={() =>
              sort.setSortOrder(sort.sortOrder === "asc" ? "desc" : "asc")
            }
            sx={{
              color: "info.main",
              background: "rgba(255,255,255,0.1)",
              "&:hover": {
                background: "rgba(255,255,255,0.2)"
              }
            }}
          >
            {sort.sortOrder === "desc" ? (
              <ArrowDownwardIcon />
            ) : (
              <ArrowUpwardIcon />
            )}
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}
