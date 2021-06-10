
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_JobGradeDelete')
	DROP PROCEDURE usp_api_JobGradeDelete
GO

CREATE PROCEDURE	usp_api_JobGradeDelete
(
	@JobGradeID INT
)
AS
BEGIN TRANSACTION 
SET NOCOUNT OFF
BEGIN TRY

	DELETE FROM JobGrade WHERE JobGradeID = @JobGradeID

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
