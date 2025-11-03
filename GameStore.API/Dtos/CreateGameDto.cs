using System.ComponentModel.DataAnnotations;

namespace GameStore.API.Dtos;

public record class CreateGameDto(
    [Required][StringLength(50)] string Name,
    int GenreId,
    [Required][Range(1, 10000)] decimal Price,
    DateOnly? ReleaseDate,
    string? ImageUrl);