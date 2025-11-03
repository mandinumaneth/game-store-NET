using System;
using GameStore.API.Dtos;
using GameStore.API.Entities;

namespace GameStore.API.Mapping;

public static class GameMapping
{
    public static Game ToEntity(this CreateGameDto game)
    {
        return new Game
        {
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            // If frontend omits the release date (null), default to today's date
            ReleaseDate = game.ReleaseDate ?? DateOnly.FromDateTime(DateTime.UtcNow),
            ImageUrl = game.ImageUrl
        };
    }

    public static Game ToEntity(this UpdateGameDto game, int id)
    {
        return new Game
        {
            Id = id,
            Name = game.Name,
            GenreId = game.GenreId,
            Price = game.Price,
            ReleaseDate = game.ReleaseDate ?? DateOnly.FromDateTime(DateTime.UtcNow),
            ImageUrl = game.ImageUrl
        };
    }

    public static GameSummaryDto ToGameSummaryDto(this Game game)
    {
        return new(
            game.Id,
            game.Name,
            game.GenreId,
            game.Genre != null ? game.Genre.Name : string.Empty,
            game.Price,
            game.ReleaseDate,
            game.ImageUrl);
    }

    public static GameDetailsDto ToGameDetailsDto(this Game game)
    {
        return new(
            game.Id,
            game.Name,
            game.GenreId,
            game.Price,
            game.ReleaseDate,
            game.ImageUrl);
    }

}
