
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_JobGradeViewAll')
	DROP PROCEDURE usp_api_JobGradeViewAll
GO
CREATE PROCEDURE usp_api_JobGradeViewAll
(
	@isShowAll		BIT
)
AS
SET NOCOUNT OFF
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SELECT
		JobGradeID,
		Description,
		Remarks,
		JobGrade,
		SalaryAmountFrom,
		SalaryAmountTo,
		isActive,
		isComboDefault,
		CreatedBy,
		CreatedDateTime,
		UpdatedBy,
		UpdatedDateTime
	FROM JobGrade 
	WHERE isActive = (CASE WHEN @isShowAll = 1 THEN isActive ELSE 1 END)

GO