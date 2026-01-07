"use client"

import styled from "styled-components";

const SelectStyle = styled.select`
    margin-bottom: 15px;
    padding: 15px 18px;

    border: 1px solid #584439;
    border-radius: 6px;

    font-size: 14px;

    background: ${(props) => props.disabled ? "#716b6b9c" : "none"};
    
    &:focus {
        border: 2px solid rgb(43, 34, 29);
    }
`;

export default function SelectPersonalizado(props) {
    return (
        <SelectStyle
            required={props.isRequired || false}
            disabled={props.disabled}
            id={props.id}
            value={props.value || ""}
            onChange={props.onChange}
            name={props.name}
        >
            {props.children}
        </SelectStyle>
    );
}