import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Colors } from "../theme";
import { Outlet, useNavigate } from "react-router-dom";
import { menuItems } from "../../utils/menuItems";

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
					backgroundColor: '#f0f0f0',
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
					<Box sx={{ width: '100%', height: "100vh", }}>
						<Grid container spacing={3}
						sx={{justifyContent: 'space-between'}}>
							{menuItems.map((item, index) => (
								<Grid size={12} key={index}>
									<Button
										sx={{
											width: '100%',
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											...(item.isLogo ? {
												flexDirection: "column",
												padding: "1rem",
											} : {
												backgroundColor: item.isLogout ? Colors.darkGray : Colors.secondary.main,
												color: Colors.white,
											}),
											borderRadius: "12px",
											transition: "all 0.2s ease-in-out",
											'&:hover': {
												backgroundColor: item.isLogout ? Colors.error : 
													item.isLogo ? Colors.primary.light : Colors.primary.main,
												...(item.isLogout && {
													transform: "scale(1.05)",
													boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
													fontWeight: "bold"
												}),
												...(item.isLogo ? {
													transform: "scale(1.02)",
												} : !item.isLogout ? {
													transform: "scale(1.02)"
												} : {}),
											}
										}}
										onClick={() => navigate(item.route)}
										disabled={item.disable}
									>
										{item.isLogo ? (
											<Typography 
												variant="h1" 
												sx={{ 
													fontSize: '1.75rem', 
													textAlign: 'center',
													marginBottom: "0.5rem",
													color: Colors.primary.main,
													'&:hover': {
														color: Colors.secondary.light
													}
												}}
											>
												{item.name}
											</Typography>
										) : (
											item.name
										)}
									</Button>
								</Grid>
							))}
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
					backgroundColor: 'Colors.white',
					overflow: "auto",
					display: "flex",
					justifyContent: "center",
					background: `linear-gradient(135deg, ${Colors.lightGray} 0%, ${Colors.white} 100%)`,
				}}
			>
				<Box sx={{ 
					width: "100%", 
					maxWidth: "4096px", 
					overflow: "hidden",
					padding: "2rem",
          			backgroundColor: '#f0f0f0',
				}}>
					<Outlet />
				</Box>
			</Box>
		</>
	);
};

export default FullScreen;