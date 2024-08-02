local Players = game:GetService("Players")
local http = game:GetService("HttpService")
print("Loaded")

--Joining
Players.PlayerAdded:Connect(function(plr)
	if http:JSONDecode(http:GetAsync("https://0.0.0.0/database/get/" .. plr.UserId)).verified == true then
		if not plr.UserId == "354603387" then
			plr:Kick("You are already verified!")
		end

		local data =
		{
			["username"] = plr.Name
		}

		if not plr.UserId == "354603387" or plr.UserId == "2214741874" then
			plr:Kick("You are now verified!")
		end
		http:PostAsync("https://0.0.0.0/database/verify", http:JSONEncode(data))
		return
	end
end)
