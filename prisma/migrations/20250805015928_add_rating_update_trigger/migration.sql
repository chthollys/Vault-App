-- migration.sql

-- Create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION update_game_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- This logic handles INSERT, UPDATE, and DELETE operations.
  -- COALESCE is used to get the gameId from either the new or old review data.
  -- For INSERT, OLD is NULL. For DELETE, NEW is NULL.
  UPDATE "Game"
  SET "rating" = (
    SELECT AVG(rating)
    FROM "Review"
    WHERE "gameId" = COALESCE(NEW."gameId", OLD."gameId")
  )
  WHERE id = COALESCE(NEW."gameId", OLD."gameId");

  -- The return value is ignored for AFTER triggers, so return NULL.
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to execute the function after any change on the Review table
CREATE TRIGGER review_changes_trigger
-- The trigger will fire AFTER an INSERT, UPDATE, or DELETE operation
AFTER INSERT OR UPDATE OR DELETE ON "Review"
FOR EACH ROW EXECUTE FUNCTION update_game_rating();