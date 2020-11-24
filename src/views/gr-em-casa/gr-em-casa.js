import React from 'react'
import Grid from "@material-ui/core/Grid";

import SideBar from "../../components/sidebar/sidebar";

export default function () {
    return (
        <React.Fragment>
        <div classename="container" >
            <SideBar/>
            <div classename="hearder">
                <button>NOVO</button>
                <span>GR EM CASA </span>
            </div>
            <div classname="cards-views">

            </div>
        </div>
        </React.Fragment>
    )
}
