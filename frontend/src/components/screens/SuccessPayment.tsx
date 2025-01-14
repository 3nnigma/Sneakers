import { BadgeCheck } from "lucide-react";
import React from "react";

const PaymentSuccess: React.FC = () => {
	return (
		<div style={styles.body}>
			<div style={styles.container}>
				<BadgeCheck size={56} className="text-green-500 m-6" />
				<h1 style={styles.heading}>Payment Successful!</h1>
				<p style={styles.text}>
					Thank you for your purchase. Your payment was processed successfully.
				</p>
				<a href="/" style={styles.button}>
					Go Back to Home
				</a>
			</div>
		</div>
	);
};

const styles: { [key: string]: React.CSSProperties; } = {
	body: {
		margin: 0,
		fontFamily: "Arial, sans-serif",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		height: "70vh"
	},
	container: {
		textAlign: "center",
		padding: "30px",
		background: "rgba(255, 255, 255, 0.15)",
		borderRadius: "15px",
		boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
	},
	icon: {
		fontSize: "4rem",
		marginBottom: "20px",
	},
	heading: {
		fontSize: "2.5rem",
		marginBottom: "20px",
	},
	text: {
		fontSize: "1.2rem",
		marginBottom: "30px",
	},
	button: {
		display: "inline-block",
		padding: "10px 20px",
		fontSize: "1rem",
		color: "#000",
		background: "white",
		border: "none",
		borderRadius: "25px",
		textDecoration: "none",
		cursor: "pointer",
		transition: "background-color 0.3s, transform 0.2s",
		textAlign: "center",
	},
};

export default PaymentSuccess;