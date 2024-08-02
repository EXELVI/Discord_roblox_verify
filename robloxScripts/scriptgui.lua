--- ScreenGui
---     Frame
---         UICorner
---     TextLabel (If you can read this it means that the verify didn't go well)
---     TextButton (Close)
---     Script (This script)


local gui = script.Parent
local frame = gui.Frame
local label = gui.TextLabel
local button = gui.TextButton

frame.Position = UDim2.new(0.5, -250, 0.5, -150)

local screenSize = game.Workspace.CurrentCamera.ViewportSize
frame.Size = UDim2.new(0, screenSize.X, 0, screenSize.Y)


label.Position = UDim2.new(0.5, -250, 0.5, -150)
label.Size = UDim2.new(0, 500, 0, 300)

button.Position = UDim2.new(0.5, -250, 0.5, -150)


gui.Enabled = true
button.MouseButton1Click:Connect(function()
    gui:Destroy()
end)


