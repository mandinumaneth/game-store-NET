namespace GameStore.API.Dtos;

public record class GameSummaryDto(
    int Id,
    string Name,
    int GenreId,
    string Genre,
    decimal Price,
    DateOnly ReleaseDate);