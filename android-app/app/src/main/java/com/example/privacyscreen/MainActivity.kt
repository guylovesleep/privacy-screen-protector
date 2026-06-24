package com.example.privacyscreen

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.widget.Button
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private val OVERLAY_PERMISSION_REQ_CODE = 1234

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Simple programmatic layout instead of xml for brevity
        val layout = android.widget.LinearLayout(this)
        layout.orientation = android.widget.LinearLayout.VERTICAL
        layout.setPadding(64, 64, 64, 64)

        val btnToggle = Button(this)
        btnToggle.text = "Toggle Privacy Screen"
        
        btnToggle.setOnClickListener {
            if (checkOverlayPermission()) {
                val intent = Intent(this, PrivacyOverlayService::class.java)
                if (PrivacyOverlayService.isRunning) {
                    stopService(intent)
                } else {
                    startService(intent)
                }
            } else {
                requestOverlayPermission()
            }
        }

        layout.addView(btnToggle)
        setContentView(layout)
    }

    private fun checkOverlayPermission(): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return Settings.canDrawOverlays(this)
        }
        return true
    }

    private fun requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val intent = Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:$packageName")
            )
            startActivityForResult(intent, OVERLAY_PERMISSION_REQ_CODE)
            Toast.makeText(this, "Please grant 'Display over other apps' permission", Toast.LENGTH_LONG).show()
        }
    }
}
