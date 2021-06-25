import styled from 'styled-components'

export const ExamesEstilo = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  form {
    width: 100%;

    input {
      width: 100%;
      padding: 8px;
    }

    div {
      p {
        font-size: 14px;
      }
    }

    div + div {
      margin-top:10px;
    }

    button {
      width: 20%;
      margin-top: 10px;
      padding: 4px;
      border-radius: 8px;
      background: lightgreen;
      color: #000;
      font-size: 18px;
      border: none;
    }
  }

  main {
    width: 100%;
    margin-top: 40px;

    h1 {
      text-align: center;
    }

    h2 {
      margin-top: 30px;
      margin-bottom: 10px;
    }

    header, section {
      display: flex;
      justify-content: space-between;
      align-items: center;

      width: 100%;
    }

    header {
      border-bottom: 1px solid #eee;
      margin-bottom: 8px;

      p {
        width: 20%;
      }
    }

    section {
      p {
        width: 20%;
      }

      button {
        background: red;
        color: #FFF;
        border: none;
        padding: 4px;
        border-radius: 2px;
      }
    }

    section + section {
      margin-top: 16px;
    }

    div {
      margin-top: 40px;
    }
  }
`
