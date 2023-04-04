import { Visibility, VisibilityOff } from "@mui/icons-material";

import Button from "../shared/Button";
import { ClickAwayListener } from "@mui/base";
import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { keyframes } from "styled-components";
import styled from "styled-components";
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";

//animation for modal changing backdrop-filter from 0 to 1rem
const blurIn = keyframes`
	from {
		backdrop-filter: blur(0);
	}
	to {
		backdrop-filter: blur(1rem);
	}
`;

const StyledModal = styled.div`
	color: #000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	backdrop-filter: blur(1rem);
	animation: ${blurIn} 0.2s linear;
	.modal__content {
		padding: 1.2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.6rem;
		position: absolute;
		height: 50rem;
		width: 50rem;
		top: calc(50% - 25rem);
		background-color: #fff;
		.auth-fields {
			display: flex;
			flex-direction: column;
			gap: 2.4rem;
			width: 60%;
		}
		.alternative-action {
			font-size: 1rem;
			opacity: 0.75;
			margin-top: auto;
			button {
				background: none;
				border: none;
				margin-left: 0.4rem;
				color: #4101f8;
				text-decoration: underline;
			}
		}
	}
`;

interface AuthProps {
	authMode: string;
	setAuthMode: (mode: string) => void;
}

function AuthModal({ authMode, setAuthMode }: AuthProps) {
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<StyledModal
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<ClickAwayListener onClickAway={() => setAuthMode("")}>
				<div className="modal__content">
					<h1>{authMode}</h1>
					<div className="auth-fields">
						{authMode === "Sign up" && (
							<FormControl variant="standard">
								<InputLabel
									htmlFor="username-input"
									sx={{ zIndex: 2 }}
								>
									Username
								</InputLabel>
								<Input
									id="username-input"
									autoFocus={true}
									autoComplete={"username"}
									required={true}
									//color="error"
								/>
							</FormControl>
						)}
						<FormControl variant="standard">
							<InputLabel
								htmlFor="email-input"
								sx={{ zIndex: 2 }}
							>
								Email
							</InputLabel>
							<Input
								id="email-input"
								autoComplete={"email"}
								type="email"
								autoFocus={authMode === "Log in"}
								required={true}
								//color="error"
							/>
						</FormControl>
						<FormControl variant="standard">
							<InputLabel
								htmlFor="standard-adornment-password"
								sx={{ zIndex: 2 }}
							>
								Password
							</InputLabel>
							<Input
								id="standard-adornment-password"
								autoComplete="current-password webauthn"
								type={showPassword ? "text" : "password"}
								required={true}
								size="medium"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
								//color="error"
							/>
						</FormControl>
						<Button
							color={"var(--secondary-green)"}
							label={authMode}
						/>
						{authMode === "Sign in" && (
							<Button
								color={"var(--secondary-green)"}
								label="Forgot password?"
							/>
						)}
					</div>
					<div className="alternative-action">
						{authMode === "Log in" ? (
							<>
								<span>Don't have an account?</span>
								<button onClick={() => setAuthMode("Sign up")}>
									Sign up
								</button>
							</>
						) : (
							<>
								<span>Already have an account?</span>
								<button onClick={() => setAuthMode("Log in")}>
									Log in
								</button>
							</>
						)}
					</div>
				</div>
			</ClickAwayListener>
		</StyledModal>
	);
}

export default AuthModal;
