import { COLORS,FONT_SIZE } from "../../constants/theme.js"

export const styles = {
    despesa: {
        width: "100%",
        backgroundColor: COLORS.gray,
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    
    containerIcon: {
        flex: 3,
    },

    despesaIcon: {
        width: 45,
        height: 45
    },

    containerCategoria: {
        flex: 10,
    },
    despesaCategoria: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.black,
        fontWeight: "bold",
    },
    despesaDescricao: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.black,
    },

    containerValor: {
        flex: 4,
    },
    despesaValor: {
        fontSize: FONT_SIZE.md,
        color: COLORS.black,
        fontWeight: "bold",
        textAlign: "right",
    },
}