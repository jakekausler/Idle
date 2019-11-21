import React from 'react';

import HeaderPanel from './headerpanel/HeaderPanel';
import SideBar from './sidebar/SideBar';
import MainPanelContainer from '../../containers/MainPanelContainer';
import BottomBar from './bottombar/BottomBar';

import './MainContent.css'

export default function Main() {
	return (
		<div
			style={{
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column',
				height: 'calc(100vh - 100px - 20px)'
			}}
		>
			<HeaderPanel />
			<div className="MainPanelContainer">
				<MainPanelContainer />
				<SideBar />
			</div>
			<BottomBar />
		</div>
	);
}