export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column._id}-placeholder-card`,
        boardId: column.boardId,
        columnId: column._id,
        Frontend_PlaceholderCard: true,
    }
}
