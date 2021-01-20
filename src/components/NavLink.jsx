import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom';
import colors from '../styles/colors'

const NavLink = styled(Link)`
  background: ${colors.primary};
  color: ${colors.white};
  border-radius: 20px;
  border: 2px solid ${colors.primary};
  padding: .5em 1em;
  text-decoration: none;
  font-size: 14px;
  margin-right: 5px;
  margint-top: 5px;
  cursor: pointer;

    ${props =>
      props.danger &&
      css`
        background: ${colors.danger};
        border: 2px solid ${colors.danger};
      `};

      ${props =>
        props.secondary &&
        css`
          background: ${colors.secondary};
          border: 2px solid ${colors.secondary};
        `};

        ${props =>
          props.disabled &&
          css`
            background-color: ${colors.grey1};
            color: ${colors.grey3};
            background: ${colors.grey1};
            border: 1px solid ${colors.grey1};
            cursor: not-allowed;
          `};
`
export default NavLink