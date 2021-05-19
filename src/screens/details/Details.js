import React, { Component } from 'react';
import restaurant from "./restaurant.jpg";
import "./Details.css";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Container from '@material-ui/core/Container';



class Details extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="image">
            <img src={restaurant} />
          </div>
          <div className="grid">
            <span className="res_Name">Loud Silence</span><br></br>
            <span className="locality">CBD-BELAPUR</span><br></br>
            <span className="category">Chinese,Continental,Indian,Italian,Snacks</span>
            <i class="fa fa-star" aria-hidden="true"></i>

          </div>

        </div>

      </div>
    );
  }
}

export default Details;