import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paper from "material-ui/Paper";
import { styles } from '../../Styling/Styling';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { GridList, GridTile } from 'material-ui/GridList';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

class Display extends Component {
    constructor() {
        super()
        this.state = {
            open: false
        }
    }

    drawerOpen = () => this.setState({ open: !this.state.open })

    render() {

        const gridstyles = {
            root: {
                display: 'flex',
                marginLeft: '350px',
                marginTop: '20px',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 700,
                height: 750,
                overflowY: 'auto',
            },
        }

        const tilesData = [
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/96cf051cac47b044ada10c546aaff796-KOKO-architects-Skapet-06-photo-TonuTunnel--16-.jpg',
                title: 'Lodging',
                featured: true,
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/cbfc4d82ce7dcbb037f2eb519ca5a021-KOKO-architects-Skapet-22-photo-TonuTunnel--2-.jpg',
                title: 'Kitchen View',
                featured: true
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/09dc1528f60ccacf3ff85e68163b416c-KOKO-architects-Skapet-11-photo-TonuTunnel-.jpg',
                title: 'Living Space',
                featured: true
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/1f1f5f9c3eff83a3d265acccb7de71c0-KOKO-architects-Skapet-28-photo-TonuTunnel--5-.jpg',
                title: 'Outdoor Showers',
                featured: true,
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/689c94689a04e4ebf317b2d0082ba4d7-KOKO-architects-Skapet-32-photo-MariusDalseg--7-.jpg',
                title: 'Dogs Allowed',
                featured: true
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/6125d993c1fabe2a5350b71aaf544ebf-KOKO-architects-Skapet-26-photo-TonuTunnel--23-.jpg',
                title: 'Sleeping Area',
                featured: true
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/1ab4060739d81b92f88c32903f52dad2-KOKO-architects-Skapet-31-photo-TonuTunnel--17-.jpg',
                title: 'Group Trips',
                featured: true
            },
            {
                img: 'http://www.koko.ee/images/projects/137/web/full/2c3d1ddc4fd9c95e230bcbba883fb975-KOKO-architects-MOUNTAIN-LODGES-sauna-plan.jpg',
                title: 'Floor Plans',
                featured: true
            },
        ];

        return (
            <div className='displayPic'>
                <Paper style={styles.userReservation.display}>
                    <RaisedButton
                        label='Read More'
                        onClick={this.drawerOpen}
                    />
                    <div style={gridstyles.root}>
                        <GridList
                            cols={2}
                            cellHeight={500}
                            padding={1}
                            style={gridstyles.gridList}
                        >
                            {tilesData.map((tile) => (
                                <GridTile
                                    key={tile.img}
                                    title={tile.title}
                                    actionPosition='left'
                                    titlePosition='top'
                                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                                    cols={tile.featured ? 2 : 1}
                                >
                                    <img src={tile.img} />
                                </GridTile>
                            ))}
                        </GridList>

                        <Drawer
                            open={this.state.open}
                            openSecondary={true}
                            width={600}
                        >
                            <h2 style={styles.About.drawerHeader}>Enjoy the unique experience of Norway's self catering Tourist Cabins</h2>
                            <p>askjgklasdjglkasdjgadsjgakldsjglkdjgkasjdgkladjglkadjg</p>
                            <br/>
                            <br/>
                            <br/>
                            <Paper style={{margin:'20px', padding: '20px'}}>
                            <Menu>
                                <MenuItem primaryText='EQUIPMENT NEEDED'/>
                                <Divider/>
                                <MenuItem primaryText='BOOKING INFO'/>
                                <Divider/>                                
                                <MenuItem primaryText='DIRECTIONS'/>
                                <Divider/>                                
                                <MenuItem primaryText='MISC'/>
                            </Menu>
                            </Paper>
                            <br/>
                            <br/>
                            <br/>
                            <br/>                            
                            <Link to='/'><RaisedButton label='Login' /></Link>
                        </Drawer>
                    </div>
                </Paper>
            </div>

        )
    }
}

export default Display;