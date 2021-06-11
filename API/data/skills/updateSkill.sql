UPDATE [dbo].[SkillsInfo]
SET [SkillName]=@SkillName
WHERE [SkillID]=@SkillID

SELECT [SkillID]
      ,[SkillName]
  FROM [dbo].[SkillsInfo]
  WHERE [SkillID]=@SkillID