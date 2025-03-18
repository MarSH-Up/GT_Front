import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Colors } from "../theme";
import { Outlet, useNavigate } from "react-router-dom";

const FullScreen = () => {
	const navigate = useNavigate();

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					width: "250px",
					height: "100vh", 
					overflowX: "hidden",
					backgroundColor: `${Colors.secondary.light}`,
					transition: "all 0.3s ease-in-out",
					backdropFilter: "blur(2.5px)",
					borderRight: `2px solid ${Colors.lightGray}`,
					boxShadow: `0 0 15px rgba(0,0,0,0.1)`,
					left: "0",
					top: 0,
				}}
			>
				<Toolbar sx={{ 
					flexDirection: 'column', 
					alignItems: 'center', 
					marginTop: "2rem",
					padding: "0 1rem"
				}}>
					<Box sx={{ width: '100%' }}>
						<Grid container>
							<Grid size={12}>
								<Button
									sx={{
										width: '100%',
										display: "flex",
										alignItems: "center", 
										justifyContent: "center",
										flexDirection: "column",
										padding: "1rem",
										borderRadius: "12px",
										transition: "all 0.2s ease-in-out",
										'&:hover': {
											backgroundColor: Colors.lightGray,
											transform: "scale(1.02)"
										}
									}}
									onClick={() => navigate("/")}
								>
									<Typography 
										variant="h1" 
										sx={{ 
											fontSize: '1.75rem', 
											textAlign: 'center',
											marginBottom: "0.5rem",
											color: Colors.primary.main
										}}
									>
										Gesture Therapy
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Toolbar>
			</AppBar>
			<Box
				sx={{
					width: "calc(100vw - 250px)",
					height: "100vh",
					boxSizing: "border-box",
					marginLeft: "250px",
					backgroundColor: Colors.white,
					overflow: "auto",
					display: "flex",
					justifyContent: "center",
					background: `linear-gradient(135deg, ${Colors.lightGray} 0%, ${Colors.white} 100%)`,
				}}
			>
				<Box sx={{ 
					width: "100%", 
					maxWidth: "4096px", 
					padding: "2rem",
					'@media (max-width: 600px)': {
						padding: "1rem"
					},
          backgroundColor: Colors.secondary.light
				}}>
					<Outlet />
				</Box>
			</Box>
		</>
	);
};

export default FullScreen;