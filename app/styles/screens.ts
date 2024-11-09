import { StyleSheet } from "react-native";

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 72,
    justifyContent: "center",
    maxWidth: 480,
    alignSelf: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 36,
    fontFamily: "Satoshi-Regular",
    color: "#111827",
    marginBottom: 24,
  }
});