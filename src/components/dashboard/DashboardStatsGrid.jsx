import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { Wallet, Users, BarChart2, ShoppingBag } from 'lucide-react';

const DashboardStatsGrid = ({ stats }) => {


  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Card sx={{ 
            bgcolor: 'black',
            color: '#d1d5db',
            border: '1px solid #262626',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            '&:hover': { 
              boxShadow: '0 0 15px rgba(249,115,22,0.2)'
            }, 
            transition: 'all 0.3s ease'
          }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#f97316',
                    color: 'black'
                  }}
                >
                  {stat.icon}
                </Box>
                <Box display="flex" alignItems="center" color={stat.positive ? '#f97316' : '#ff4444'}>
                  <Typography variant="body2">{stat.change}</Typography>
                </Box>
              </Box>
              <Typography sx={{ color: '#d1d5db' }} variant="body2">
                {stat.title}
              </Typography>
              <Typography variant="h6" fontWeight="bold" mt={0.5} sx={{ color: '#f97316' }}>
                {stat.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStatsGrid;