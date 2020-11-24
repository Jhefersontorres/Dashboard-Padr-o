import React from 'react'
import SideBar from "../../components/sidebar/sidebar";

export default function schedule() {
    return (
        <div>
            <SideBar/>
            <div classename="hearder">
                <button>NOVO</button>
                <span>Agenda  </span>
            </div>
            <div classname="cards-views"></div>
        </div>
    )
}
