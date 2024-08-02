local Players = game:GetService("Players")
local http = game:GetService("HttpService")
print("Loaded")

--Joining
Players.PlayerAdded:Connect(function(plr)
	local dbData = http:JSONDecode(http:GetAsync("https://0.0.0.0/database/get/" .. plr.UserId))
	if dbData.verified == true then
		if not plr.UserId == "354603387" then
			plr:Kick("You are already verified!")
			return
		end
	end

	if dbData.awaitingVerification == false then
		plr:Kick("You are not waiting for verification!")
		return
	end

	local data =
	{
		["username"] = plr.Name
	}

	if not plr.UserId == "354603387" or plr.UserId == "2214741874" then
		if http:JSONDecode(http:PostAsync("https://0.0.0.0/database/verify", http:JSONEncode(data))).success == true then
			plr:Kick("You are now verified!")
		end
	end

	return
end)
