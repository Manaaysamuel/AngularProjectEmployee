
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_EmployeeInsert')
	DROP PROCEDURE usp_api_EmployeeInsert
GO

CREATE PROCEDURE	usp_api_EmployeeInsert
(
	@FirstName  nvarchar(512),
	@LastName  nvarchar(512),
  @Birthdate date
)
AS
BEGIN TRANSACTION 
SET NOCOUNT OFF
BEGIN TRY

	INSERT INTO EmployeeInfo(
			FirstName,
			LastName,
			Birthdate
		)
		VALUES (
			@FirstName,
      @LastName,
      @Birthdate
			
		)
	

		SELECT SCOPE_IDENTITY() as ID

COMMIT TRANSACTION
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION
        DECLARE @ErrorNum INT = ERROR_NUMBER();  
        DECLARE @ErrorLine INT = ERROR_LINE();  
        DECLARE @ErrorMsg NVARCHAR(4000) = ERROR_MESSAGE();  
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();  
        DECLARE @ErrorState INT = ERROR_STATE();  
   RAISERROR(@ErrorMsg, @ErrorSeverity, @ErrorState);  
END CATCH


GO
