
export const fileType = (filePath: String) => {
    return filePath.split(".").pop()?.toLowerCase()
}