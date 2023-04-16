import { useEffect, useState } from "react";
import { getLeaderboard } from "../../logic/actions";
import styled from "styled-components";
import {
	IconsMapping,
	MapIconToMode,
	capitaliseModeName,
} from "../../logic/utils";
import LeaderBoardBadge from "../shared/LeaderBoardBadge";
import StyledTooltip from "../shared/StyledTooltip";

const StyledTableContainer = styled.div`
	padding: 1.6rem;
	border-radius: 3.2rem;
	border: 0.1rem solid var(--light-border-color);
	filter: drop-shadow(0 0.4rem 0.4rem rgba(0, 0, 0, 0.2));
	box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
	.filter-container {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		border-radius: 1.6rem;
		overflow: hidden;
		background-color: var(--dark-shade);
		width: fit-content;
		padding: 0.8rem 1.6rem;
		@media (hover: none) and (pointer: coarse) {
			padding: 0 1.6rem;
			gap: 2.4rem;
			button i {
				font-size: 2.2rem !important;
			}
		}

		button {
			&.selected,
			:hover {
				i {
					transform: scale(1.1);
					opacity: 1;
				}
			}
			i {
				opacity: 0.5;
				font-size: 1.8rem;
				transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
			}
		}
	}
	table {
		border-collapse: collapse;
		width: 100%;
		th {
			font-size: 1.6rem;
			font-weight: 500;
			text-align: left;
			border-bottom: 0.1rem solid var(--light-border-color);
			padding: 0.8rem;
			&.mode,
			&.rank {
				text-align: center;
			}
			&.score {
				text-align: right;
			}
		}
		td {
			padding: 0.8rem 1.6rem;
			border-bottom: 0.1rem solid var(--light-border-color);
			&.user-info {
				> div {
					display: flex;
					align-items: center;
					gap: 0.8rem;
					img {
						width: 3.2rem;
						height: 3.2rem;
						border-radius: 0.4rem;
					}
					.username {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			&.score {
				text-align: right;
			}
			&.mode,
			&.rank {
				text-align: center;
			}
		}
	}
`;

interface Score {
	username: string;
	userPhoto: string;
	score: number;
	mode: string;
}

function Leaderboard() {
	const [modeFilter, setModeFilter] = useState<string>("all");
	const [leaderBoard, setLeaderBoard] = useState<Score[]>([]);

	const handleSetModeFilter = (mode: string) => {
		if (mode === modeFilter) setModeFilter("all");
		else setModeFilter(mode);
	};

	useEffect(() => {
		getLeaderboard({ mode: modeFilter }).then((res) => {
			setLeaderBoard(res);
		});
	}, [modeFilter]);

	return (
		<StyledTableContainer>
			<div className="filter-container">
				Mode:
				{Object.values(IconsMapping).map((icon) => {
					return (
						<ModeButton
							key={icon}
							mode={MapIconToMode[icon!]}
							modeFilter={modeFilter}
							handleSetModeFilter={handleSetModeFilter}
						/>
					);
				})}
			</div>
			<table>
				<thead>
					<tr>
						<th className="rank">#</th>
						<th>Username</th>
						<th className="mode">Mode</th>
						<th className="score">Score</th>
					</tr>
				</thead>
				<tbody>
					{leaderBoard?.map((user, index) => {
						return (
							<tr key={index}>
								<td className="rank">
									{index < 3 ? (
										<LeaderBoardBadge rank={index + 1} />
									) : (
										index + 1
									)}
								</td>
								<td className="user-info">
									<div>
										<img src={user.userPhoto} />
										<span className="username">
											{user.username}
										</span>
									</div>
								</td>
								<td className="mode">
									<ModeButton
										mode={user.mode}
										modeFilter={modeFilter}
										handleSetModeFilter={
											handleSetModeFilter
										}
									/>
								</td>
								<td className="score">{user.score}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</StyledTableContainer>
	);
}

export default Leaderboard;

interface ModeButtonProps {
	mode: string;
	modeFilter: string;
	handleSetModeFilter: (mode: string) => void;
}

const ModeButton = ({
	mode,
	modeFilter,
	handleSetModeFilter,
}: ModeButtonProps) => {
	return (
		<StyledTooltip
			placement="bottom"
			title={capitaliseModeName(mode)}
			arrow
		>
			<button
				className={mode === modeFilter ? "selected" : ""}
				onClick={() => handleSetModeFilter(mode)}
				key={mode}
			>
				<i className={IconsMapping[mode]}></i>
			</button>
		</StyledTooltip>
	);
};
