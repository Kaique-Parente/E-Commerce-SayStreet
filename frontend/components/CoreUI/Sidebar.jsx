import React from 'react'
import {
  CBadge,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebarToggler,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilHome, cilCloudDownload, cilLayers, cilPuzzle, cilSpeedometer } from '@coreui/icons'
import Image from 'next/image'
import styled from 'styled-components'
import { signOut } from 'next-auth/react'

const LogoutContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  cursor: pointer;

  padding: 16px 0;
  border-radius: 6px;

  &:hover{
    background: #f3f4f7;
  }
`

export const Sidebar = () => {
  return (
    <>
      <CSidebar style={{ marginTop: "80px", boxShadow: "rgba(40, 41, 61, 0.04) 0px 2px 4px, rgba(96, 97, 112, 0.16) 0px 8px 16px" }} className="border-end" unfoldable size='xl'>
        <CSidebarNav>
          <CNavTitle>Menu de Opções</CNavTitle>
          <CNavItem href="#">
            <Image style={{ marginRight: "15px" }} src={"/web/sidebar/home.png"} width={28} height={28} alt='home' /> Início
          </CNavItem>
          <CNavItem href="#">
            <Image style={{ marginRight: "15px" }} src={"/web/sidebar/pessoa.png"} width={28} height={28} alt='pessoa' /> Meus dados
          </CNavItem>
          <CNavItem href="#">
            <Image style={{ marginRight: "15px" }} src={"/web/sidebar/sacola.png"} width={28} height={28} alt='sacola' /> Meus pedidos
          </CNavItem>
          <CNavItem href="#">
            <Image style={{ marginRight: "15px" }} src={"/web/sidebar/carteira.png"} width={28} height={28} alt='carteira' /> Minha carteira
          </CNavItem>
        </CSidebarNav>
        <CSidebarHeader style={{overflow: "hidden", display: "flex", justifyContent: "space-between", padding: "0px"}} className="border-top">
          <LogoutContainer onClick={() => signOut({ callbackUrl: "/login" })}>
            <Image 
              style={{margin: "0px 20px 0px 15px"}} 
              src={"/web/sidebar/saida.png"} 
              width={28} height={28} alt='saida' 
            />
            <span>Sair</span>
          </LogoutContainer>  
        </CSidebarHeader>
      </CSidebar>
    </>
  )
}