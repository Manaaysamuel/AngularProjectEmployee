
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_JobGradeInsert')
	DROP PROCEDURE usp_api_JobGradeInsert
GO

CREATE PROCEDURE	usp_api_JobGradeInsert
(
	@Description  nvarchar(512),
	@Remarks  nvarchar(512),
	@JobGrade  nvarchar(100),
	@SalaryAmountFrom  decimal,
	@SalaryAmountTo  decimal,
	@isComboDefault bit,
	@isActive bit,
	@CreatedBy  nvarchar(512) = null
)
AS
BEGIN TRANSACTION 
SET NOCOUNT OFF
BEGIN TRY

	INSERT INTO JobGrade(
			Description,
			SalaryAmountFrom,
			Remarks,
			JobGrade,
			SalaryAmountTo,
			isActive,
			isComboDefault,
			CreatedBy,
			CreatedDateTime
		)
		VALUES (
			@Description,
			@SalaryAmountFrom,
			@Remarks,
			@JobGrade,
			@SalaryAmountTo,
			@isActive,
			@isComboDefault,
			@CreatedBy,
			GETDATE()
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
