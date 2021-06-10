
IF EXISTS (SELECT * FROM sys.procedures WHERE name = 'usp_api_JobGradeViewSpecificJob')
	DROP PROCEDURE usp_api_JobGradeViewSpecificJob
GO
CREATE PROCEDURE usp_api_JobGradeViewSpecificJob
(
	@isShowAll		BIT
)
AS
SET NOCOUNT OFF
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SELECT
		JobGradeID,
		Description
	FROM JobGrade 
	WHERE isActive = (CASE WHEN @isShowAll = 1 THEN isActive ELSE 1 END)

GO