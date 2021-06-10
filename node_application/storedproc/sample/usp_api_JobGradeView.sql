
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_JobGradeView')
	DROP PROCEDURE usp_api_JobGradeView
GO
CREATE PROCEDURE usp_api_JobGradeView
(
	@JobGradeID		INT
)
AS
SET NOCOUNT OFF
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SELECT	
		Description,
		SalaryAmountFrom,
		SalaryAmountTo,
		Remarks,
		JobGrade,
		isActive,
		isComboDefault,
		CreatedBy,
		CreatedDateTime,
		UpdatedBy,
		UpdatedDateTime
	FROM JobGrade 
	WHERE JobGradeID = @JobGradeID

GO