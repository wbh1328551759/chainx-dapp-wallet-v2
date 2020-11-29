
import React  from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  padding-left: 0;
  li {
    cursor: pointer;
    padding: 3px 6px;
    border-radius: 1px;
    color: #9ca8c1;
    font-size: 12px;
    list-style: none;
    &.active {
      background: #e1eaf8;
      color: #3f3f3f;
    }
  }
`;

export default function (props): React.ReactElement {
  return (
    <Ul>
      {props.types.map((type) => {
        return (
          <li
            className={type.name === props.name ? 'active' : ''}
            key={type.type}
            onClick={(e) => {
              props.setName(e.target.textContent);
            }}
          >
            {props.type}
            {type.name}
          </li>
        );
      })}
    </Ul>
  );
}
