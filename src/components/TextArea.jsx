import styled from 'styled-components';

import colors from '../styles/colors';

const TextArea = styled.textarea`
resize: none;
height: 100px;
width: 400px;
font: 400 12px sans-serif;
padding: 5px;
border: 1px solid ${colors.grey1};
border-radius: 5px;
outline: none;`

export default TextArea;