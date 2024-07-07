import { COLORS, FONT_SIZE } from "../../../../constants/theme.js";

export const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    secaoCima: {
        flex: 0.3,
        padding: 20,
        paddingTop: 35,
        backgroundColor: COLORS.dark_blue,
    },

    textTitulo: {
        color: COLORS.white,
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
    },

    valorTitulo: {
        color: COLORS.white,
        fontSize: FONT_SIZE.xl,
        fontWeight: "bold",
    },

    divBotoEscolha: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingTop: 20,
    },

    divBotaoEscolha: {
        alignItems: "center",
    },

    imgTitulo: {
        width: 60,
        height: 60,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center',
    },

    divBaixaArredon:{
        flex: 1,
        paddingTop: 5,
        padding: 20,
    },

    scrollDiv: {
        height: '100%',
    },

    textData: {
        paddingTop: 10,
        color: COLORS.black,
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
    },
}