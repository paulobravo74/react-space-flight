import { useState } from "react"

import { _data, } from "../service/Api"

export default function Main() {

    console.log(_data.results)

    return (
        <>
            <p>Hello Main</p>
        </>
    )
}