"use client"

import NavBar from "@/components/ClientComponents/NavBar";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 80px;

    h3{
        font-size: 16px;
    }
`;

export default function Login(){
    return(
        <>
            <NavBar/>
            <Container>

            </Container>
            <h1 style={{marginTop: "100px"}}>Login</h1>
        </>
    );
}