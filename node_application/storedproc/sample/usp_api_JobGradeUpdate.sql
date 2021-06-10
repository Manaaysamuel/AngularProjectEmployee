
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_JobGradeUpdate')
	DROP PROCEDURE usp_api_JobGradeUpdate
GO

CREATE PROCEDURE	usp_api_JobGradeUpdate
(
	@Description  nvarchar(512),
	@Remarks  nvarchar(512),
	@JobGrade  nvarchar(100),
	@SalaryAmountFrom  decimal,
	@SalaryAmountTo  decimal,
	@UpdatedBy  nvarchar(512) = null,
	@isActive BIT,
	@isComboDefault BIT,
	@JobGradeID INT
)
AS
BEGIN TRANSACTION 
SET NOCOUNT OFF
BEGIN TRY

	UPDATE JobGrade
		SET
			Description = @Description,
			Remarks = @Remarks,
			JobGrade = @JobGrade,
			SalaryAmountFrom = @SalaryAmountFrom,
			SalaryAmountTo = @SalaryAmountTo,
			isActive = @isActive,
			isComboDefault = @isComboDefault,
			UpdatedBy = @UpdatedBy,
			UpdatedDateTime = GETDATE()
		
		WHERE JobGradeID = @JobGradeID

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
